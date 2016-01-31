/**
 * Player Entity
 */
game.PlayerSportEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // disable gravity
        this.body.gravity = 4;
        this.body.setVelocity(25, 25);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk right",  [1, 0, 1, 2], 50);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("walk right");
    },

    /**
     * update the entity
     */
    update : function (dt) {
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
                me.audio.play("jump");
            }
        }
        
        // update the entity velocity
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        
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

game.ObstacleSportEntity = me.Entity.extend({
    onCollision : function (response, other) {
        me.state.change(me.state.GAMEOVER);
        return false;
    }
});
