require 'test_helper'

class RacesControllerTest < ActionController::TestCase
  setup do
    @race = races(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:races)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create race" do
    assert_difference('Race.count') do
      post :create, :race => @race.attributes
    end

    assert_redirected_to race_path(assigns(:race))
  end

  test "should show race" do
    get :show, :id => @race.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @race.to_param
    assert_response :success
  end

  test "should update race" do
    put :update, :id => @race.to_param, :race => @race.attributes
    assert_redirected_to race_path(assigns(:race))
  end

  test "should destroy race" do
    assert_difference('Race.count', -1) do
      delete :destroy, :id => @race.to_param
    end

    assert_redirected_to races_path
  end
end
