// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){

    this.on('dequeue', function(song){
      this.remove(song);
    });

    // we have to remove ended songs from the queue.
    this.on('ended', function(){
      // we remove it from the first position.
      this.first().dequeue();
      this.trigger('dequeued');
      // we play the next one.
      if(this.length > 0){
        this.playFirst();
      }
    },this);


    // when a song is added
    this.on('add', function(){
      // if its the only song, we need to play it.
      if(this.length === 1){
        this.playFirst();
      }

    });
  },
  playFirst: function(){
    this.first().play();
  }

});
