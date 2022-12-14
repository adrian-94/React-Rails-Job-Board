require 'rails_helper'

RSpec.describe Job, type: :model do
  before(:all) do
    @clone_job = FactoryBot.create(:job)
  end
  # maybe not all of these are currently validated
  it 'is not valid without a title, description, status or slug' do
    %i[title description status slug].each do |attr|
      job = Job.new(attr => nil)
      puts attr
      expect(job).to_not be_valid
    end
  end

  describe '#slug' do
    it 'should be automatically generated' do
      job = FactoryBot.create(:job)
      expect(job.slug).to_not be_nil
    end

    it 'should be unique' do
      job = FactoryBot.create(:job, title: 'foo')
      job2 = FactoryBot.create(:job, title: 'foo')
      expect(job.slug).to_not eq(job2.slug)
    end
  end
end
