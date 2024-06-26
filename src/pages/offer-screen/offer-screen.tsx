import { useParams } from 'react-router-dom';

import { Offers } from '../../types/offers';
import { ReviewsPack } from '../../types/reviews';

import { isString } from '../../utils/utils';
import Error404Screen from '../error-404-screen/error-404-screen';
import Header from '../../components/header/header';
import PlaceOffer from '../../components/place-offer/place-offer';
import PlacesList from '../../components/places-list/places-list';

type OfferScreenProps = {
  offers: Offers;
  reviewsPack: ReviewsPack;
}

export default function OfferScreen({
  offers,
  reviewsPack
}: OfferScreenProps): React.JSX.Element {
  const params = useParams();

  const isIdValid = Boolean(params.id && isString(params.id) && offers.some((offer) => offer.id === params.id));

  if (!isIdValid) {
    return (<Error404Screen />);
  }

  const currentOfferId = params.id as string;
  const reviews = reviewsPack[currentOfferId];
  const similarPlaces = offers.filter((offer) => offer.id !== currentOfferId);

  return (
    <div className="page">
      <Header offers={offers}/>
      <main className="page__main page__main--offer">
        <PlaceOffer
          offers={offers}
          currentOfferId={currentOfferId}
          reviews={reviews}
        />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList offers={similarPlaces} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
