package com.biobest.value;

public class OrderChanges<time, appUserId>{

    private String time;
    private String appUserId;

    public OrderChanges(String time, String appUserId){
        this.time = time;
        this.appUserId = appUserId;
    }

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getAppUserId() {
		return appUserId;
	}

	public void setAppUserId(String appUserId) {
		this.appUserId = appUserId;
	}
}