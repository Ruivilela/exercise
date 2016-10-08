class PagesController < ApplicationController
  def home
    @playlist = Saveplaylist.find_by(id: 3)
    @playlist = @playlist.name
  end
end
