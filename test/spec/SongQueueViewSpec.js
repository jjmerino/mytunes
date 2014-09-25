describe('SongQueueView', function() {
  var view, fakeSongs;

  beforeEach(function() {
    fakeSongs = new SongQueue([
      {
        artist: 'data',
        url: '/test/testsong.mp3',
        title:'test song'
      },
      {
        artist: 'data',
        url: '/test/testsong2.mp3',
        title:'test song 2'
      }
    ]);
  });

  it('creates SongQueueEntryViews for each queued song & renders them', function(){
    sinon.spy(SongQueueEntryView.prototype, 'render');
    view = new SongQueueView({collection: fakeSongs});
    view.render();
    expect(SongQueueEntryView.prototype.render).to.have.been.called;
  });

  it('renders when add or remove event fires from the song queue collection', function(){
    sinon.spy(SongQueueView.prototype, 'render');
    view = new SongQueueView({collection: fakeSongs});
    view.collection.add({
      artist: 'data',
      url: '/test/testsong3.mp3',
      title:'test song 3'
    });
    view.collection.pop();
    expect(view.render).to.have.been.called;
  });

  describe('modifying the queue',function(){
    it('removes a song when the song is clicked',function(){
      // fixture - a set of data and variables that need to be created for the test to run (a simulation of a 'real' environment)

      sinon.spy(SongModel.prototype, 'dequeue');

      view = new SongQueueView({collection: fakeSongs});
      view.render();
      var func = fakeSongs.first().dequeue;

      var clickedElement = view.$el.find('tr').first();
      console.log(clickedElement);
      clickedElement.click();
      expect(func).to.have.been.called;
      SongModel.prototype.dequeue.restore();
    });

  })
});
