"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { formatPrice } from "@/lib/data"

type Step = "shipping" | "payment" | "confirm"
type PaymentMethod = "mpesa" | "cod"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const [step, setStep] = useState<Step>("shipping")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa")
  const [mpesaPhone, setMpesaPhone] = useState(user?.phone || "")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [mpesaPromptSent, setMpesaPromptSent] = useState(false)

  const [shipping, setShipping] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "Nairobi",
    area: "",
    notes: "",
  })

  const deliveryFee = totalPrice >= 3000 ? 0 : 200
  const grandTotal = totalPrice + deliveryFee

  const updateShipping = (field: string, value: string) =>
    setShipping((prev) => ({ ...prev, [field]: value }))

  const handleMpesaPayment = async () => {
    setIsProcessing(true)
    setMpesaPromptSent(false)

    // Simulate STK Push delay
    await new Promise((r) => setTimeout(r, 1500))
    setMpesaPromptSent(true)

    // Simulate waiting for M-Pesa confirmation
    await new Promise((r) => setTimeout(r, 3000))
    setIsProcessing(false)
    setOrderPlaced(true)
    clearCart()
  }

  const handleCODPayment = async () => {
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsProcessing(false)
    setOrderPlaced(true)
    clearCart()
  }

  const handlePlaceOrder = () => {
    if (paymentMethod === "mpesa") {
      handleMpesaPayment()
    } else {
      handleCODPayment()
    }
  }

  // ===== ORDER SUCCESS =====
  if (orderPlaced) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="animate-fade-in-up w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--green)]/10">
            <i className="fa-solid fa-circle-check text-5xl text-[var(--green)]" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Order Placed Successfully!</h1>
          <p className="mb-2 text-muted-foreground">
            Thank you for shopping with JSEdumart.
          </p>
          <p className="mb-1 text-sm text-muted-foreground">
            Order #{`JSE${Date.now().toString().slice(-6)}`}
          </p>
          {paymentMethod === "mpesa" && (
            <div className="mx-auto mt-4 max-w-xs rounded-xl border border-[var(--green)]/30 bg-[var(--green)]/5 p-4">
              <i className="fa-solid fa-mobile-screen-button mb-2 text-2xl text-[var(--green)]" />
              <p className="text-sm font-medium text-foreground">M-Pesa Payment Confirmed</p>
              <p className="text-xs text-muted-foreground">
                KSh {grandTotal.toLocaleString()} received from {mpesaPhone}
              </p>
            </div>
          )}
          {paymentMethod === "cod" && (
            <div className="mx-auto mt-4 max-w-xs rounded-xl border border-[var(--yellow)]/30 bg-[var(--yellow)]/5 p-4">
              <i className="fa-solid fa-money-bill-wave mb-2 text-2xl text-[var(--yellow)]" />
              <p className="text-sm font-medium text-foreground">Cash on Delivery</p>
              <p className="text-xs text-muted-foreground">
                Please have KSh {grandTotal.toLocaleString()} ready at delivery
              </p>
            </div>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            A confirmation has been sent to <span className="font-medium text-foreground">{shipping.email}</span>
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)]"
            >
              <i className="fa-solid fa-bag-shopping text-xs" />
              Continue Shopping
            </Link>
            <a
              href={`https://wa.me/254704454556?text=${encodeURIComponent(`Hi JSEdumart! I just placed an order and would like to track it.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              <i className="fa-brands fa-whatsapp text-[#25d366]" />
              Track via WhatsApp
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ===== EMPTY CART =====
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
        <div className="animate-fade-in-up text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <i className="fa-solid fa-basket-shopping text-4xl text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Nothing to Checkout</h1>
          <p className="mb-8 text-sm text-muted-foreground">Add some items to your cart first.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)]"
          >
            <i className="fa-solid fa-bag-shopping" />
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const steps: { key: Step; label: string; icon: string }[] = [
    { key: "shipping", label: "Shipping", icon: "fa-truck" },
    { key: "payment", label: "Payment", icon: "fa-credit-card" },
    { key: "confirm", label: "Confirm", icon: "fa-check" },
  ]

  const stepIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <nav className="animate-fade-in mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-[var(--teal)]">Home</Link>
          <i className="fa-solid fa-chevron-right text-[8px]" />
          <Link href="/cart" className="transition-colors hover:text-[var(--teal)]">Cart</Link>
          <i className="fa-solid fa-chevron-right text-[8px]" />
          <span className="font-medium text-foreground">Checkout</span>
        </nav>

        {/* Step Progress */}
        <div className="animate-fade-in-up mb-8">
          <div className="mx-auto flex max-w-lg items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                      i <= stepIndex
                        ? "bg-[var(--navy)] text-white shadow-lg shadow-[var(--navy)]/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < stepIndex ? (
                      <i className="fa-solid fa-check text-xs" />
                    ) : (
                      <i className={`fa-solid ${s.icon} text-xs`} />
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${i <= stepIndex ? "text-[var(--navy)]" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`mx-3 mb-5 h-0.5 w-12 rounded-full transition-all duration-500 sm:w-20 md:w-28 ${
                    i < stepIndex ? "bg-[var(--navy)]" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="flex-1">
            {/* ===== STEP 1: SHIPPING ===== */}
            {step === "shipping" && (
              <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
                  <i className="fa-solid fa-truck text-[var(--teal)]" />
                  Shipping Details
                </h2>

                {!isAuthenticated && (
                  <div className="mb-6 flex items-center gap-3 rounded-xl bg-[var(--teal)]/5 p-4">
                    <i className="fa-solid fa-circle-info text-[var(--teal)]" />
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="/auth/signin" className="font-semibold text-[var(--teal)] hover:underline">Sign in</Link>{" "}
                      for faster checkout.
                    </p>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="shFirst" className="mb-1.5 block text-sm font-medium text-foreground">First Name</label>
                    <input
                      id="shFirst"
                      type="text"
                      value={shipping.firstName}
                      onChange={(e) => updateShipping("firstName", e.target.value)}
                      placeholder="John"
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="shLast" className="mb-1.5 block text-sm font-medium text-foreground">Last Name</label>
                    <input
                      id="shLast"
                      type="text"
                      value={shipping.lastName}
                      onChange={(e) => updateShipping("lastName", e.target.value)}
                      placeholder="Doe"
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="shEmail" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                      <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                      <input
                        id="shEmail"
                        type="email"
                        value={shipping.email}
                        onChange={(e) => updateShipping("email", e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="shPhone" className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
                    <div className="relative">
                      <i className="fa-solid fa-phone absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                      <input
                        id="shPhone"
                        type="tel"
                        value={shipping.phone}
                        onChange={(e) => updateShipping("phone", e.target.value)}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="shAddress" className="mb-1.5 block text-sm font-medium text-foreground">Delivery Address</label>
                    <div className="relative">
                      <i className="fa-solid fa-location-dot absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                      <input
                        id="shAddress"
                        type="text"
                        value={shipping.address}
                        onChange={(e) => updateShipping("address", e.target.value)}
                        placeholder="Street address, building, apartment"
                        className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="shCity" className="mb-1.5 block text-sm font-medium text-foreground">City</label>
                    <select
                      id="shCity"
                      value={shipping.city}
                      onChange={(e) => updateShipping("city", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                    >
                      <option>Nairobi</option>
                      <option>Mombasa</option>
                      <option>Kisumu</option>
                      <option>Nakuru</option>
                      <option>Eldoret</option>
                      <option>Thika</option>
                      <option>Nyeri</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="shArea" className="mb-1.5 block text-sm font-medium text-foreground">Area / Estate</label>
                    <input
                      id="shArea"
                      type="text"
                      value={shipping.area}
                      onChange={(e) => updateShipping("area", e.target.value)}
                      placeholder="e.g. Westlands, Dagoretti"
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="shNotes" className="mb-1.5 block text-sm font-medium text-foreground">Order Notes (optional)</label>
                    <textarea
                      id="shNotes"
                      value={shipping.notes}
                      onChange={(e) => updateShipping("notes", e.target.value)}
                      placeholder="Special instructions for delivery..."
                      rows={3}
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("payment")}
                  disabled={!shipping.firstName || !shipping.lastName || !shipping.email || !shipping.phone || !shipping.address}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--navy)] py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue to Payment
                  <i className="fa-solid fa-arrow-right text-xs" />
                </button>
              </div>
            )}

            {/* ===== STEP 2: PAYMENT ===== */}
            {step === "payment" && (
              <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
                  <i className="fa-solid fa-credit-card text-[var(--teal)]" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* M-Pesa */}
                  <button
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                      paymentMethod === "mpesa"
                        ? "border-[#4caf50] bg-[#4caf50]/5 shadow-md"
                        : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                    }`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      paymentMethod === "mpesa" ? "bg-[#4caf50] text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      <i className="fa-solid fa-mobile-screen-button text-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">M-Pesa</span>
                        <span className="rounded bg-[#4caf50] px-2 py-0.5 text-[9px] font-bold uppercase text-white">Recommended</span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Pay instantly via Safaricom M-Pesa STK Push
                      </p>
                    </div>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      paymentMethod === "mpesa" ? "border-[#4caf50] bg-[#4caf50]" : "border-muted-foreground/30"
                    }`}>
                      {paymentMethod === "mpesa" && <i className="fa-solid fa-check text-[8px] text-white" />}
                    </div>
                  </button>

                  {/* COD */}
                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                      paymentMethod === "cod"
                        ? "border-[var(--yellow)] bg-[var(--yellow)]/5 shadow-md"
                        : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                    }`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      paymentMethod === "cod" ? "bg-[var(--yellow)] text-[var(--navy)]" : "bg-muted text-muted-foreground"
                    }`}>
                      <i className="fa-solid fa-money-bill-wave text-lg" />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-foreground">Cash on Delivery</span>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Pay when your order is delivered to you
                      </p>
                    </div>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      paymentMethod === "cod" ? "border-[var(--yellow)] bg-[var(--yellow)]" : "border-muted-foreground/30"
                    }`}>
                      {paymentMethod === "cod" && <i className="fa-solid fa-check text-[8px] text-[var(--navy)]" />}
                    </div>
                  </button>
                </div>

                {/* M-Pesa Phone Input */}
                {paymentMethod === "mpesa" && (
                  <div className="mt-6 animate-fade-in rounded-xl border border-[#4caf50]/20 bg-[#4caf50]/5 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4caf50]">
                        <i className="fa-solid fa-mobile-screen text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">M-Pesa Payment</p>
                        <p className="text-xs text-muted-foreground">Enter your Safaricom number to receive STK push</p>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-sm font-medium text-muted-foreground">+254</span>
                      <input
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="7XX XXX XXX"
                        maxLength={13}
                        className="w-full rounded-lg border border-[#4caf50]/30 bg-white py-3 pl-16 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#4caf50] focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20"
                      />
                    </div>
                    <div className="mt-3 flex items-start gap-2">
                      <i className="fa-solid fa-shield-halved mt-0.5 text-xs text-[#4caf50]" />
                      <p className="text-[11px] text-muted-foreground">
                        You will receive an STK push notification on your phone. Enter your M-Pesa PIN to complete the payment of <strong className="text-foreground">{formatPrice(grandTotal)}</strong>.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep("shipping")}
                    className="flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
                  >
                    <i className="fa-solid fa-arrow-left text-xs" />
                    Back
                  </button>
                  <button
                    onClick={() => setStep("confirm")}
                    disabled={paymentMethod === "mpesa" && !mpesaPhone}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--navy)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Review Order
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </button>
                </div>
              </div>
            )}

            {/* ===== STEP 3: CONFIRM ===== */}
            {step === "confirm" && (
              <div className="animate-fade-in-up space-y-6">
                {/* Shipping Summary */}
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-bold text-foreground">
                      <i className="fa-solid fa-truck text-[var(--teal)]" />
                      Delivery Details
                    </h3>
                    <button onClick={() => setStep("shipping")} className="text-xs font-medium text-[var(--teal)] hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="grid gap-2 text-sm sm:grid-cols-2">
                    <p className="text-muted-foreground">Name: <span className="font-medium text-foreground">{shipping.firstName} {shipping.lastName}</span></p>
                    <p className="text-muted-foreground">Phone: <span className="font-medium text-foreground">{shipping.phone}</span></p>
                    <p className="text-muted-foreground">Email: <span className="font-medium text-foreground">{shipping.email}</span></p>
                    <p className="text-muted-foreground">City: <span className="font-medium text-foreground">{shipping.city}{shipping.area ? `, ${shipping.area}` : ""}</span></p>
                    <p className="text-muted-foreground sm:col-span-2">Address: <span className="font-medium text-foreground">{shipping.address}</span></p>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-bold text-foreground">
                      <i className="fa-solid fa-credit-card text-[var(--teal)]" />
                      Payment Method
                    </h3>
                    <button onClick={() => setStep("payment")} className="text-xs font-medium text-[var(--teal)] hover:underline">
                      Edit
                    </button>
                  </div>
                  {paymentMethod === "mpesa" ? (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4caf50]">
                        <i className="fa-solid fa-mobile-screen-button text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">M-Pesa</p>
                        <p className="text-xs text-muted-foreground">STK Push to {mpesaPhone}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--yellow)]">
                        <i className="fa-solid fa-money-bill-wave text-[var(--navy)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items Summary */}
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
                    <i className="fa-solid fa-box text-[var(--teal)]" />
                    Order Items ({items.length})
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-[var(--navy)]">
                          {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("payment")}
                    className="flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
                  >
                    <i className="fa-solid fa-arrow-left text-xs" />
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--green)] py-4 text-sm font-bold text-white transition-all hover:bg-[var(--green)]/90 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      mpesaPromptSent ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin" />
                          Waiting for M-Pesa confirmation...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-spinner fa-spin" />
                          {paymentMethod === "mpesa" ? "Sending STK Push..." : "Placing Order..."}
                        </>
                      )
                    ) : (
                      <>
                        <i className="fa-solid fa-lock text-xs" />
                        Place Order - {formatPrice(grandTotal)}
                      </>
                    )}
                  </button>
                </div>

                {isProcessing && paymentMethod === "mpesa" && mpesaPromptSent && (
                  <div className="animate-fade-in rounded-xl border border-[#4caf50]/20 bg-[#4caf50]/5 p-4 text-center">
                    <i className="fa-solid fa-mobile-screen-button mb-2 text-3xl text-[#4caf50]" />
                    <p className="text-sm font-semibold text-foreground">Check Your Phone</p>
                    <p className="text-xs text-muted-foreground">
                      Enter your M-Pesa PIN on the prompt sent to {mpesaPhone}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">Order Summary</h3>
              <div className="mb-4 max-h-48 space-y-2 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-sm">
                    <span className="flex-1 truncate text-muted-foreground">
                      {item.product.name} <span className="text-xs">x{item.quantity}</span>
                    </span>
                    <span className="ml-2 shrink-0 font-medium text-foreground">
                      {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-border pt-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? "font-medium text-[var(--green)]" : "text-foreground"}>
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-lg font-bold text-[var(--navy)]">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
