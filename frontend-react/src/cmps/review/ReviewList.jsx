import { StarRating } from './StarRating'
import { LongTxt } from '../LongTxt'

export function ReviewList({ userReviews, length = 220 }) {
    return (
        <ul className='review-list'>
            {userReviews.map((review, idx) =>
                <li className='review-list' key={review.by.fullname + idx}>
                    <img className='review-image review' src={review.by.imgUrl} alt="" />
                    <div>
                        <div className="review">
                            <div className="user-info">
                                <h4>{review.by.fullname}</h4>
                                <div className="country">
                                    {review.by.flag && <img className="flag" src={review.by.flag} alt="" />}
                                    <span>{review.by.country}</span>
                                </div>
                            </div>

                            <div className="rate-info">
                                < StarRating value={review.rate} />
                                <span className="rate padding">{review.rate}</span>
                                <span className="divider"></span>
                                <span>{review.createdAt}</span>
                            </div>

                        </div>
                        <LongTxt className='review-txt' txt={review.txt} length={length} />

                    </div>
                </li>

            )}
        </ul>
    )
}