class Saveplaylist < ApplicationRecord
  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, headers:true) do |row|
      playlist_hash = row.to_hash
      playlist = Saveplaylist.where(name: playlist_hash["name"])
      if playlist.count == 0
        Saveplaylist.create!(name: playlist_hash['name'], url: playlist_hash['url'])
      end
    end
  end
end
