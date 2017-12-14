class Purchase
  def initialize(email:, token:, amount:)
    @email  = email
    @token  = token
    @amount = amount
  end

  def charge!
    @charge = Stripe::Charge.create(
      customer:    customer.id,
      amount:      @amount,
      description: 'Posterluv customer',
      currency:    'usd'
    )

    @charge
  end

  def paid?
    @charge.paid
  end

  private

  attr_reader :email, :token, :amount

  def customer
    @customer ||= Stripe::Customer.create(email: email, source: token)
  end
end
