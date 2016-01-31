/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //this.body.gravity = 1;
        velocityX = 15;
        velocityY = 3;

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(velocityX, velocityY);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        this.renderable = new me.AnimationSheet(0, 0, {
            image: "beer-sprite",
            framewidth: 64,
            frameheight: 64
        });

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk left",  [4, 4, 4, 4], 250);
        this.renderable.addAnimation("walk right",  [0, 0, 0, 0], 250);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("walk right");
        tmpCurrent = 0;
        beerEmpty = false;
        timer=0;

    },

    /**
     * update the entity
     */
    update : function (dt) {
        tmpCurrent += dt;
        dtLim = 4000;
        //this.body.accel.x += 1;
        if (tmpCurrent < 2000 /*me.input.isKeyPressed('left')*/) {
            begin = true;
            next = false;
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            // change to the walking animation
            velocityX=(Math.random() * 30) + 5;
            this.body.setVelocity(velocityX, velocityY);
        /*} else if (me.input.isKeyPressed('right')) {
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk right")) {
                this.renderable.setCurrentAnimation("walk right");
            }*/

        }else{
            begin = false;
            next = true;
                this.body.vel.x += this.body.accel.x * me.timer.tick;
                velocityX=(Math.random() * 30) + 5;
                this.body.setVelocity(velocityX, velocityY);
        };

        if(tmpCurrent > dtLim){
            tmpCurrent=0;
            velocityX = 15;
            //this.body.vel.x < 0 ? "stand left" : "stand right"
            //this._super(me.Entity, 'init', [x, y , settings]);
        }

        if(this.pos.x>700 || this.pos.x<200){
            if (!this.renderable.isCurrentAnimation("walk right")) {
                this.renderable.setCurrentAnimation("walk right");
            };
        };

        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
                if ((this.pos.x > 400) && (this.pos.x < 500)){
                    me.audio.play("bois");
                    if (!this.renderable.isCurrentAnimation("walk left")) {
                        this.renderable.setCurrentAnimation("walk left");
                    };
                    game.data.score += 100;
                }else{
                    game.data.score -= 200;
                }

            }

        };

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});

/*----------------
a Coin entity
----------------- */
game.CoinEntity = me.CollectableEntity.extend({
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision : function (response, other) {
        // do something when collected
        me.audio.play("cling");

        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        // remove it
        me.game.world.removeChild(this);

        // update the score
        game.data.score += 250;

        return false
    }
});

/* --------------------------
an enemy Entity
------------------------ */
game.EnemyEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - x;//settings.framewidth;
        this.pos.x  = x + width - x;//settings.framewidth;

        // to remember which side we were walking
        this.walkLeft = false;

        // walking & jumping speed
        this.body.setVelocity(5, 0);

        // define a basic walking animation (using all frames)
        //this.renderable.addAnimation("walk left",  [2, 3], 250);
        //this.renderable.addAnimation("walk right",  [0, 1], 250);

        // set the standing animation as default
        //this.renderable.setCurrentAnimation("walk right");
    },

    // manage the enemy movement
    update: function(dt) {

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.renderable.flipX(this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;

        } else {
            this.body.vel.x = 0;
        }

        // update the body movement
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
    * colision handler
    * (called when colliding with other objects)
    */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});
