class CreateCourses < ActiveRecord::Migration
  def change
    execute 'drop table if exists courses;'
    create_table :courses do |t|
      t.belongs_to :user
      t.json :jumps
      t.timestamps
    end
  end
end
