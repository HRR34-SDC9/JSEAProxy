import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

var failureRate = new Rate("check_failure_rate");

export let options = {
  stages: [
    //ramp up virtual users
    {target: 50, duration: "1m30s"},
    //hold virtual users
    {target: 50, duration: "3m"},
    //ramp up an additional number of virtual users
    {target: 200, duration: "2m30s"},
    //hold virtual users
    {target: 200, duration: "2m30s"},
    //ramp down virtual users
    {target: 0, duration: "30s"}
  ],
  thresholds: {
    "http_req_duration": ["p(90)<500"],
    "check_failure_rate": [
      "rate<0.01",
      {threshold: "rate<=0.10", abortOnFail: true}
    ],
  },
};

export default function () {

  let response = '';
  for (var id = 1; id <= 100; id++) {
    response = http.get(`http://localhost:3000/product/${id}`, {tags: {name: 'GetProducts'}});
  }

  let checkResponse = check(response, {
    "status is 200": (r) => r.status === 200
  });


  //count the failures
  failureRate.add(!checkResponse);

  //Suspend VU execution for the specified duration.
  sleep(Math.random() * 5);
};