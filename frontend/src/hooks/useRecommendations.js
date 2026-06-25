import { useSelector, useDispatch } from 'react-redux';
import { fetchRecommendations, submitFeedback, clearRecommendations } from '@store/recommendationSlice';

const useRecommendations = () => {
  const dispatch = useDispatch();
  const { outfits, weather, loading, error, feedbackMap } = useSelector((state) => state.recommendations);

  const getRecommendations = (occasion) => dispatch(fetchRecommendations({ occasion }));
  const giveFeedback = (outfitId, rating) => dispatch(submitFeedback({ outfit_id: outfitId, rating }));
  const markWorn = (outfitId) => dispatch(submitFeedback({ outfit_id: outfitId, rating: 'wore' }));
  const clear = () => dispatch(clearRecommendations());

  return { outfits, weather, loading, error, feedbackMap, getRecommendations, giveFeedback, markWorn, clear };
};

export default useRecommendations;
