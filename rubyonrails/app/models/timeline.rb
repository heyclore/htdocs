class Timeline < ApplicationRecord
  validates :author, presence: true
  validates :quotes, presence: true
end
