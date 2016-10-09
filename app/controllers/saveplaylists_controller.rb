class SaveplaylistsController < ApplicationController
  def index
    @playlist = Saveplaylist.all
  end

  def import
    Saveplaylist.import(params[:file])
    redirect_to '/saveplaylists', notice: "Playlists imported."
  end
end
