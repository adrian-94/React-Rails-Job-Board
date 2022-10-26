class JobApplication < ApplicationRecord
  belongs_to :job
  belongs_to :user
  validates :name, :experience, :status, :cover_letter, :contact,  presence: true
  # Has status: applied, reviewed, rejected, withdrawn
  STATUSES = [:applied, :reviewed, :rejected, :withdrawn]
end
