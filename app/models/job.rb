class Job < ApplicationRecord
  has_many :job_applications, dependent: :destroy
  before_validation :generate_slug
  validates  :slug, :title, :status, :description,  presence: true
  validates :slug, uniqueness: true

  # Has status: open, closed, draft
  STATUSES = [:closed, :open, :draft]

  def generate_slug
    p "Generrating slug"
    self.slug = title
    if Job.where(slug: slug).exists?
      loop do
        self.slug += SecureRandom.uuid
        break unless Job.where(slug: slug).exists?
      end
    end
  end

  def to_param
    #return the string of the slug stored in our database
    self.slug
  end
end
