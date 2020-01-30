# Failed steps retriever

A simple [CRA](https://github.com/facebook/create-react-appapp) app that retrieves [Gauge's](https://gauge.org/) failed steps from [Gitlab's](https://gitlab.com/) pipeline into results table.

## Problem

When running Gauge automated tests with parameter `max-retries`, sometimes flaky tests cannot be observed easily - for instance they fail two times per tests and happens to pass at last time.<br />
On Gitlab runner we have info only about failed tests, unless we dig into the logs.<br />
This tools allows us to get info about possible flaky tests without digging into the logs of pipelines - and get summed up results of failed steps. We can then easily spot where are the weak spots of our automated tests.

## Instruction

The builded app is uploaded to: [https://zciluk.github.io/get-failed-steps/app/](https://zciluk.github.io/get-failed-steps/app/) <br />
There we have three fields: <br />
_`projectID`_ - which is gitlab's id of your project. Can be retrieved from API. If you want to pass projectId to not write it each time you can pass it via parameter `/app?projectId=xxxxx`<br />
_`apiKey`_ - which can be personally generated [here](https://gitlab.com/profile/personal_access_tokens) - select `api` permission. Your key in the app does not go anywhere beside Gitlab request and app state. _REMEMBER!_ Be careful with your key and do not compromise it<br />
_`date`_ - by default set to Today's date. <br />
Then click _Get results_ to retrieve data.

## How it works

It is combination of three API calls - at first it gets Pipelines for selected date, then it gets Jobs from these Pipelines and at the end it gets log trace for each job. <br />
From logs the app extracts only Failed steps indicators.

## Limitations

Pipelines API limits returned pipelines to 20, and allows to paginate it via Before and After date. Therefore only 20 pipelines can be returned for 1 day.

## TODOs and ideas

🚀 find a way to omit 20 pipelines limitation (requests for each hour?)

🚀 add ability to download PDF with report

🚀 add ability to return results for more than 1 day (multiple requests)
