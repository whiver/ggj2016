game.PlayScreenVictory = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.levelDirector.loadLevel("victory");
        me.audio.stopTrack();
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
    }
});
