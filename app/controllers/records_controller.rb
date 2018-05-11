class RecordsController < ApplicationController
    

    def index
        render json: Record.all
    end

    def show
    render json: Record.find(params["id"])
    end

    def create
    render json: Record.create(params["record"])
    end

    def delete
    render json: Record.delete(params["id"])
    end

    def update
    render json: Record.update(params["id"], params["record"])
end

end
