var occupe = [null, null, null, null, null, null, null, null, null];
var random = [0, 0, 0, 0, 0, 0, 0, 0];

game.PlayScreenMorpion = me.ScreenObject.extend({






    /**
     *  action to perform on state change
     */
    onResetEvent: function() {



        function isfree(idCase, img, player){
            console.log("infunction");

            if(occupe[idCase-1] === null ){

                console.log("inif");

                switch (idCase){

                    case 1:
                        console.log("case1begin");
                        me.game.world.addChild(new me.Sprite (128, 32, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player;
                        console.log("case1done");
                        break;

                    case 2:
                        me.game.world.addChild(new me.Sprite (416, 32, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                    case 3:
                        me.game.world.addChild(new me.Sprite (704, 32, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                    case 4:
                        me.game.world.addChild(new me.Sprite (128, 192, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                    case 5:
                        me.game.world.addChild(new me.Sprite (416, 192, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                    case 6:
                        me.game.world.addChild(new me.Sprite (704, 192, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                    case 7:
                        me.game.world.addChild(new me.Sprite (128, 352, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                    case 8:
                        me.game.world.addChild(new me.Sprite (416, 352, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                    case 9:
                        me.game.world.addChild(new me.Sprite (704, 352, { image : me.loader.getImage(img) }));
                        occupe[idCase-1] = player ;
                        break;

                }

            }

        }



        function fillRandom(){
            var i = 0;
            var tot = 0;
            while(i<7){
                var test = Math.floor(Math.random()*60)%8;
                //console.log(test);
                if(test != random[0] && test != random[1] && test != random[2] && test != random[3] && test != random[4] && test != random[5] && test != random[6]){

                    random[i] = test;
                    tot = tot + test;
                    i = i+1;
                }
            }
            random[8] = 36 - tot;
        }

        fillRandom(random);

        function affiche(){

            var l = 0;
            while(l<9){

                console.log(random[l]);
                l = l+1;

            }


        }
        affiche();
        var t = 0;
        function IAplay()
        {
            var t = 0;
            while(occupe[random[t]] != null && t < 9){

                t = t + 1;
                console.log("t dans la boucle = ", t);

            }

            //t = t + 1;
            isfree(random[t]+1, "VerticalStickMorpion", 1);
        }

        function endOfGame(){

            if( occupe[0] != null && occupe[0] == occupe[1] && occupe[1] == occupe[2] ||
                occupe[3] != null && occupe[3] == occupe[4] && occupe[4] == occupe[5] ||
                occupe[6] != null && occupe[6] == occupe[7] && occupe[7] == occupe[8] ||
                occupe[0] != null && occupe[0] == occupe[3] && occupe[3] == occupe[6] ||
                occupe[1] != null && occupe[1] == occupe[4] && occupe[4] == occupe[7] ||
                occupe[2] != null && occupe[2] == occupe[5] && occupe[5] == occupe[8] ||
                occupe[0] != null && occupe[0] == occupe[4] && occupe[4] == occupe[8] ||
                occupe[2] != null && occupe[2] == occupe[4] && occupe[4] == occupe[6]){

                return true;
                console.log("end of game");

            }
            if(occupe[0] != null && occupe[1] != null && occupe[2] != null && occupe[3] != null
                && occupe[4] != null && occupe[5] != null && occupe[6] != null && occupe[7] != null
                && occupe[8] != null){

                me.state.change(me.state.GAMEOVER);
            }
        }

        // load a level
        me.levelDirector.loadLevel("morpion");

        // reset the score
        game.data.score = 0;

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.X, "click");
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.X);



          me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "click") {

                // play something on click
                console.log("test");
                console.log(event.pointerId);
                console.log(event.gameX);
                console.log(event.gameY);

                if(event.gameX > 64 && event.gameX < 320 && event.gameY > 32 && event.gameY < 160){

                    console.log("case 1");
                    isfree(1, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 352 && event.gameX < 608 && event.gameY > 32 && event.gameY < 160){

                    console.log("case 2");
                    isfree(2, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 640 && event.gameX < 896 && event.gameY > 32 && event.gameY < 160){

                    console.log("case 3");
                    isfree(3, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 64 && event.gameX < 320 && event.gameY > 192 && event.gameY < 320){

                    console.log("case 4");
                    isfree(4, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 352 && event.gameX < 608 && event.gameY > 192 && event.gameY < 320){

                    console.log("case 5");
                    isfree(5, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 640 && event.gameX < 896 && event.gameY > 192 && event.gameY < 320){

                    console.log("case 6");
                    isfree(6, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 64 && event.gameX < 320 && event.gameY > 352 && event.gameY < 480){

                    console.log("case 7");
                    isfree(7, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 352 && event.gameX < 608 && event.gameY > 352 && event.gameY < 480){

                    console.log("case 8");
                    isfree(8, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }
                if(event.gameX > 640 && event.gameX < 896 && event.gameY > 352 && event.gameY < 480){

                    console.log("case 9");
                    isfree(9, "roundMorpion", 0);
                    if(endOfGame()){me.state.change(me.state.VICTORY);}
                    IAplay();
                    if(endOfGame()){me.state.change(me.state.GAMEOVER);}
                }


            }

          });
    },



    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindPointer(me.input.mouse.LEFT);
    }
});
