import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RestaurantCard from '../RestaurantCard/RestaurantCard';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import styles from './RestaurantListPage.module.scss';
import { setRestaurantListData } from '../../store/actions/restaurantActions';

const ETA_RANGE = '15 - 20 min';

const RestaurantsListPage = () => {
  const {
    restaurantListData, isLoading, isError,
  } = useSelector(({ restaurant }) => restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRestaurantListData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error massage={isError} />;
  }

  return (
    <div className={styles.restaurantsList}>
      {restaurantListData.map((item) => {
        const { heroImageUrl, title, categories, etaRange } = item[1];

        return (
          <RestaurantCard
            imageUrl={heroImageUrl}
            title={title}
            uuid={item[0]}
            categories={categories}
            etaRange={etaRange
              ? etaRange.text.replace('–', ' - ')
              : ETA_RANGE}
          />
        );
      })}
    </div>
  );
};

export default memo(RestaurantsListPage);
