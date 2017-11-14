require "test_helper"

describe PrintsController do
  it "should get new" do
    get prints_new_url
    value(response).must_be :success?
  end

  it "should get create" do
    get prints_create_url
    value(response).must_be :success?
  end
end
