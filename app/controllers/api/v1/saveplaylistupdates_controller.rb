class Api::V1::SaveplaylistupdatesController < ActionController::Base
  def create
    @playlist = Saveplaylist.create(save_params)
  end

  private
  def save_params
    params.require(:saveplaylist).permit(:name, :url)
  end
end
