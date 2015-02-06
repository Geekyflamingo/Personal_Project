class CoursesController < ApplicationController
  before_action :set_course, only: [:show, :edit, :update, :destroy]

  def index
    @courses = Course.where(user_id: current_user)
  end

  def show
    @course = Course.where(user_id: current_user).find(params[:id])
  end

  def new
    @course = Course.new
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      redirect_to course_path(@course), notice: 'Course was successfully created.'
    else
      render :new
    end
  end

  def update

  end

  def edit

  end

  def destroy
    	  @course.destroy
    	  redirect_to courses_path, notice: 'Course was deleted.'
  	end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:name, :jumps, :user_id)
  end

end
