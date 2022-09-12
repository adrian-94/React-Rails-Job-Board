class Job < ApplicationRecord
  has_many :job_applications, dependent: :destroy
  before_save :generate_slug
  validates :slug, :title, :status, :description,  presence: true
  validates :slug, uniqueness: true

  # Has status: open, closed, draft
  STATUSES = [:open, :closed, :draft]

  def generate_slug
    self.slug = SecureRandom.uuid
  end
end
