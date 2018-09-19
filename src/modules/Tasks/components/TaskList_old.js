import { List } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import "moment/locale/tr";
import React from "react";
import Sortable from 'react-sortablejs';
import ApiService from "../../../service/ApiService";
import Task from "./Task";

const api = new ApiService();

const TaskList = ({items, months, fetchTasks}) => {
  const getIdIndexMap = (targetList) => {
    const result = {};
    const itemDoms = [...targetList.children].filter(i => i.nodeName === "LI");    
    itemDoms.forEach(i => {
      result[domId2ItemId(i)] = itemDoms.indexOf(i);
    });
    return result;
  }
  const domId2ItemId = itemDom => itemDom.id.split("-")[1];
  console.log(items);
  return (
    <List>
      
      {        
        months.map(month =>
          <Sortable 
          // onChange={(order, sortable, evt) => console.log(order, sortable, evt)} grup arası taşımayı bozuyor
          options={{
            draggable: "li", 
            filter: ".MonthTitle", 
            animation: 150, 
            // delay: 100, 
            group:"Tasks",
            onEnd: function (/**Event*/evt) {
                // var itemEl = evt.item;  // dragged HTMLElement
                // evt.to;    // target list
                // evt.from;  // previous list
                // evt.oldIndex;  // element's old index within old parent
                // evt.newIndex;  // element's new index within new parent
                const targetMonthDom = evt.to;
                items
                .filter(i => Object.keys(getIdIndexMap(targetMonthDom)).includes(i._id.toString()))
                .forEach(i => {
                  console.log()
                  api.fetch(
                    "task/"+i._id,
                    "PUT",
                    {
                      ...i,
                      month: evt.item.parentElement.id,
                      index: getIdIndexMap(targetMonthDom)[i._id]
                    }
                  );
                });
              },
          }}
          id={month}
          style={{minHeight: "6em", padding: "2em 0"}}
          >
            <h4 className="MonthTitle ui header">{moment(month).format("YYYY MMMM")}</h4>
            {
              _.orderBy(items.filter(i => i.month === month), ["index"], ["asc"])
                .map((task, index) => 
                  <Task 
                    task={task} 
                    fetchTasks={fetchTasks}
                    key={`item-${index}`}

                  />
                )}
          </Sortable>
          )

      }

    </List>
  );
  }

export default TaskList;