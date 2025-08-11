package com.insa_talent_student.management.studentbachmanagement;

public interface StudentBatchService {

    BatchRes bachInfoOff(Long id);

    public class BatchRes {
        private String season;
        private int year;

        public BatchRes() {
        }

        public BatchRes(String season, int year) {
            this.season = season;
            this.year = year;
        }

        public String getSeason() {
            return season;
        }

        public void setSeason(String season) {
            this.season = season;
        }

        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        @Override
        public String toString() {
            return "BatchRes{" +
                   "season='" + season + '\'' +
                   ", year=" + year +
                   '}';
        }
    }
}


