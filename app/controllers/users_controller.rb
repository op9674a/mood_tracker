class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_token, except: [:login, :create]
  before_action :authorize_user, except: [:login, :create, :index]

# LOGIN
  def login
      user = User.find_by(username: params[:user][:username])
      if user && user.authenticate(params[:user][:password])
        token = create_token(user.id, user.username)
         render json: {status: 200, token: token, user: user}
  else
    render json: {status: 401, message: "Unauthorized"}
  end
end

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
      render json: get_current_user
  end

  def authorize_user
      puts "AUTHORIZE USER"
      puts "user id: #{get_current_user.id}"
      puts "params: #{params[:id]}"
      render json: {status: 401, message: "Unauthorized"} unless get_current_user.id == params[:id].to_i
  end
  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def create_token(id, username)
        JWT.encode(payload(id, username), ENV['JWT_SECRET'], 'HS256')
    end


    def payload(id, username)
        {
          exp: (Time.now + 30.minutes).to_i,
          iat: Time.now.to_i,
          iss: ENV['JWT_ISSUER'],
          user: {
            id: id,
            username: username
          }
        }
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username, :password_digest)
    end



end
