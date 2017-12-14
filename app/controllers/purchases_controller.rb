class PurchasesController < ApplicationController
  def create
    purchase = Purchase.new(
      email:  purchases_params[:stripeEmail],
      token:  purchases_params[:stripeToken],
      amount: purchases_params[:amount]
    ).charge!

    if purchase.paid?
      render json: { status: :ok }
    end

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to root_path
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
