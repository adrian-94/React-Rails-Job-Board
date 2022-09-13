class JobsController < ApplicationController
  before_action :set_job, only: %i[show update destroy]
 
  # GET /jobs
  def index
    # Lists only open jobs as STATUSES = [:closed, :open, :draft]
    @jobs = Job.where(status: 1).order("created_at DESC")

    render json: @jobs
  end

  # #  PATCH/PUT /jobs/1/status/0 
  # def update_status 
  #   p "eneterd update status"
  #   @
  #   if params[:status].present? && Job::STATUSES.include?(params[:status].to_sym)
  #     @job.update(status: params[:status])
  #   else
  #     render json: @job.errors, status: :unprocessable_entity
  #   end
  # end

  # GET /jobs/1
  def show
    render json: @job
  end

  # POST /jobs
  def create
    @job = Job.new(job_params)
    # @job.job_status = draft;
    if @job.save
      render json: @job, status: :created, location: @job
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /jobs/1
  def update
    console.log("Updating" + job_params.status)
    if @job.update(job_params)
      render json: @job
    else
      render json: @job.errors, status: :unprocessable_entity, hea
    end
  end

  # DELETE /jobs/1
  def destroy
    @job.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_job
    @job = Job.find_by!(slug: params[:id])
  end

  # Only allow a list of trusted parameters through.
  def job_params
    params.require(:job).permit(:title, :user_id, :description, :status)
  end
end
