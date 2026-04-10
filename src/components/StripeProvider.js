import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/js';

const stripePromise = loadStripe('pk_test_51234567890abcdefghijklmnopqr');

function StripeProvider({ children }) {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
}

export default StripeProvider;
