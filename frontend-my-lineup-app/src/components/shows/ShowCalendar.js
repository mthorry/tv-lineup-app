import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react'
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment)

let events = [
  {
    'title': 'DTS STARTS',
    'startDate': new Date(2017, 9, 13, 0, 0, 0),
    'endDate': new Date(2017, 9, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'startDate': new Date(2017, 9, 6, 0, 0, 0),
    'endDate': new Date(2017, 9, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'startDate': new Date(2017, 9, 9, 0, 0, 0),
    'endDate': new Date(2017, 9, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'startDate': new Date(2017, 9, 11),
    'endDate': new Date(2017, 9, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'startDate': new Date(2017, 9, 12, 10, 30, 0, 0),
    'endDate': new Date(2017, 9, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'startDate':new Date(2017, 9, 12, 12, 0, 0, 0),
    'endDate': new Date(2017, 9, 12, 19, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'startDate':new Date(2017, 9, 12,14, 0, 0, 0),
    'endDate': new Date(2017, 9, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'startDate':new Date(2017, 9, 12, 17, 0, 0, 0),
    'endDate': new Date(2017, 9, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'startDate':new Date(2017, 9, 12, 20, 0, 0, 0),
    'endDate': new Date(2017, 9, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'startDate':new Date(2017, 9, 19, 7, 0, 0),
    'endDate': new Date(2017, 9, 19, 10, 30, 0)
  },
  {
    'title': 'Late Night Event',
    'startDate':new Date(2017, 9, 17, 19, 30, 0),
    'endDate': new Date(2017, 9, 18, 2, 0, 0)
  },
  {
    'title': 'Multi-day Event',
    'startDate':new Date(2017, 9, 20, 19, 30, 0),
    'endDate': new Date(2017, 9, 22, 2, 0, 0)
  }
]

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class ShowCalendar extends React.Component {

//  Event = ({ events }) => {
//   return (
//     <span>
//       <strong>
//       {event.title}
//       </strong>
//       { event.desc && (':  ' + event.desc)}
//     </span>
//   )
// }

  render() {
    return(
      <div>
      <h3>Your Lineup</h3>
        <BigCalendar
          style={{height: '420px'}}
          events={events}
          views={allViews}
          defaultView='day'
          step={60}
          startAccessor='startDate'
          endAccessor='endDate'
        />
      </div>
    )
  }
}

export default ShowCalendar