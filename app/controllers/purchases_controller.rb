class PurchasesController < ApplicationController
  def create
    purchase = Purchase.new(
      email:  purchases_params[:stripeEmail],
      token:  purchases_params[:stripeToken],
      amount: purchases_params[:amount]
    ).charge!

    if purchase.paid?
      render json: { status: :ok }
    else
      render json: { status: :bad_request }
    end
  end

  private

  def purchases_params
    params.permit(
      :instagramPostUrl,
      :printSize,
      :customerName,
      :shippingAddress,
      :amount,
      :stripeToken,
      :stripeEmail
    )
  end
end
