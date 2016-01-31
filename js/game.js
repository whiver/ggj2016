
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 512, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
        
        me.state.SPORT = 10;
        me.state.BEER = 11;
        me.state.VICTORY = 12;

        // Initialize the audio.
        me.audio.init("mp3");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.SPORT, new game.PlayScreenSport());
        me.state.set(me.state.BEER, new game.PlayScreenBeer());
        me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
        me.state.set(me.state.VICTORY, new game.PlayScreenVictory());

        // add our player entity in the entity pool
        me.pool.register("player-run", game.PlayerSportEntity);
        me.pool.register("player_victory", game.PlayerVictoryEntity);
        me.pool.register("obstacle_runner", game.ObstacleSportEntity);
        me.pool.register("mainBeerPlayer", game.PlayerBeerEntity);
        me.pool.register("fin_runner", game.FinSportEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);

        // Start the game.
        me.state.change(me.state.SPORT);

    }
};
