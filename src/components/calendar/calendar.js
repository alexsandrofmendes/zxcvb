import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';

class Calendar extends Component {
  state = {
    groups : [
      { id: 1, title: 'Group 01' },
      { id: 2, title: 'Group 02' },
      { id: 3, title: 'Group 03' }
    ],
    items : [
      {id: 1, group: 'TING.001', title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour'), canChangeGroup: false, sizeTime: 1},
      {id: 2, group: 'TING.002', title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour'), canChangeGroup: false, sizeTime: 1},
      {id: 3, group: 'TING.003', title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(4, 'hour'), canChangeGroup: false, sizeTime: 2},
      {id: 4, group: 'CONF.001', title: 'item 4', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour'), canChangeGroup: false, sizeTime: 1}
    ]
  };

  itemMoveHandler = (itemId, dragTime) => {
    const savedItems = [
      ...this.state.items
  ];

    const changedItem = savedItems.findIndex((i) => i.id === itemId);
    savedItems[changedItem].start_time = dragTime;
    savedItems[changedItem].end_time = moment(dragTime).add(savedItems[changedItem].sizeTime, 'hour');
    
    this.setState({ items: savedItems });
  }

  render() {
    let resources = null
    if (this.props.recursos){
      resources = Object.keys(this.props.recursos).map(i => {
        const r = this.props.recursos[i]; 
        return {id: r.codigo, title:r.nome};
      })
    }
    return (
      <Timeline 
        style={{width: "100%"}}
        groups={resources}
        items={this.state.items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
        onItemMove={this.itemMoveHandler}
      />
    );
  }
}

export default Calendar;
