game.PlayScreenVictory = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.levelDirector.loadLevel("victory-level");

        me.timer.setTimeout(function () {me.state.change(me.state.SPORT)},20000);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
    }
});