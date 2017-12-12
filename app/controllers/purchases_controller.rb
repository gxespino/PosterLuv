class PurchasesController < ApplicationController
  def create
    purchases_params
    binding.pry
    @amount = 500

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to success_path
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
