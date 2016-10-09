class PagesController < ApplicationController
  def home
    @playlist = Saveplaylist.all
  end
end
