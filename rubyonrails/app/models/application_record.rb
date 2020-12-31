class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  validates :username, presence: true
end
