class HomeController < ApplicationController
  def index
    @quote = Timeline.find(Timeline.pluck(:id).sample)
  end

  def ajax
    @quote = Timeline.find(Timeline.pluck(:id).sample)
    render :json => { 
      quotes: @quote.quotes,
      author: @quote.author,
      user: @quote.user.username
    }
  end
end
