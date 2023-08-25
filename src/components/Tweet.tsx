import './Tweet.css'

export interface ItweetProps {
    authorName: string;
    tweetContent: string;
    tweetDate: Date;
}

function formatCustomDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    let DateParts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
   /* cate parts:
   DateParts[0] = { type: "month", value: "Dec" }
    DateParts[2] = { type: "day", value: "23" }
    DateParts[4] = { type: "year", value: "2022" }
    DateParts[6] = { type: "hour", value: "12" }
    DateParts[8] = { type: "minute", value: "15" }
    DateParts[10] = { type: "dayPeriod", value: "PM" } */
    return `${DateParts[6].value}:${DateParts[8].value} ${DateParts[10].value } • ${DateParts[0].value}, ${DateParts[2].value} ${DateParts[4].value}`
  }

const Tweet: React.FC<ItweetProps> = ({ ...props }) => {
    return (
        <li className="tweet">
            <div className="tweet__author">{props.authorName}</div>
            <div className="tweet__content">{props.tweetContent}</div>
            <div className="tweet__date">{formatCustomDate(props.tweetDate)}</div>
        </li>
    );
}

export default Tweet;