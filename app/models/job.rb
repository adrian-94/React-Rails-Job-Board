class Job < ApplicationRecord
  has_many :job_applications, dependent: :destroy
  before_save :generate_slug
  validates :slug, :title, :status, :description,  presence: true
  validates :slug, uniqueness: true

  # Has status: open, closed, draft
  STATUSES = [:closed, :open, :draft]

  def generate_slug
    self.slug = title
    # loop do
    #   self.slug = SecureRandom.uuid
    #   break unless Job.where(slug: slug).exists?
    # end
  end
end
