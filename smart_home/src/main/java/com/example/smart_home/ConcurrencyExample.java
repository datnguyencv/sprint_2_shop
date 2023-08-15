package com.example.smart_home;

    public class ConcurrencyExample {

//        private static final Object lock = new Object();

        public static void main(String[] args) {
            // Create two threads
            Thread thread1 = new Thread(new Runnable() {
                @Override
                public void run() {
                    for (int i = 0; i < 10; i++) {
                        // Get the lock
//                        synchronized (lock) {
                            // Access the shared data
                            System.out.println("Thread 1: " + i);
//                        }
                    }
                }
            });

            Thread thread2 = new Thread(new Runnable() {
                @Override
                public void run() {
                    for (int i = 0; i < 10; i++) {
                        // Get the lock
//                        synchronized (lock) {
                            // Access the shared data
                            System.out.println("Thread 2: " + i);
//                        }
                    }
                }
            });

            // Start the threads
            thread1.start();
            thread2.start();

            // Wait for the threads to finish
//            try {
//                thread1.join();
//                thread2.join();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
        }
    }
