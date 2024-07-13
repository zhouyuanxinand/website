# 重现面试现场之手撕多线程及相关问题
## 写两个线程轮流打印 1 - 100
 
   描述：个线程打印奇数，另外一个线程打印偶数，线程之间通过 wait（）和 notifyAll（）方法进行协调，确保轮流打印数字  
```java
   /**
 * @Author: 奔跑的鑫
 * @Date: 2024/6/17 - 19:46
 * Description:两个线程轮流打印 1~100
 */
public class AlternatePrinting {
    private int currentNumber = 1;
    private final Object lock = new Object();

    public static void main(String[] args) {
        AlternatePrinting ap = new AlternatePrinting();

        // 创建奇数打印线程
        Thread oddPrinter = new Thread(() -> ap.printNumber(true));
        oddPrinter.start();

        // 创建偶数打印线程
        Thread evenPrinter = new Thread(() -> ap.printNumber(false));
        evenPrinter.start();
    }

    /**
     * 根据 isOdd 标志打印奇数或者偶数
     *
     * @param isOdd true：打印奇数，false：打印偶数
     */
    private void printNumber(boolean isOdd) {
        while (true) {
            synchronized (lock) {
                // 等待直到当前线程有资格打印数字
                while ((isOdd && currentNumber % 2 == 0) || (!isOdd && currentNumber % 2 == 1)) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        // 恢复中断状态
                        Thread.currentThread().interrupt();
                        return; // 线程被中断，退出循环
                    }
                }

                // 检查是否已经打印到100
                if (currentNumber > 100) {
                    return; // 退出循环
                }

                // 打印数字并增加 currentNumber
                System.out.println("Thread " + (isOdd ? "Odd" : "Even") + ": " + currentNumber);
                currentNumber++;

                // 唤醒另一个线程
                lock.notify(); // 只唤醒一个线程
            }
        }
    }
}
```
## （二）三个线程交替顺序打印出 1-100
  
  描述：针对每个线程分配一个打印范围，第一个线程打印 3 的倍数，第二个线程打印 3n + 1 的数，第三个线程打印 3n + 2 的数（其中n是非负整数），同时使用一种机制来确保三个线程交替执行。
  ```java
    /**
 * @Author: 奔跑的鑫
 * @Date: 2024/7/7 - 15:25
 * Description:
 */
public class AlternatePrintingThreeThreads {
    /**
     * 当前要打印的数字
     */
    private int currentNumber = 1;
    /**
     * 用于同步的锁对象
     */
    private final Object lock = new Object();
    /**
     * 控制哪个线程应该打印的标识 0:3n ,1:3n + 1,2: 3n + 2
     */
    private int turn = 0;

    public static void main(String[] args) {
        AlternatePrintingThreeThreads ap = new AlternatePrintingThreeThreads();

        // 创建并启动三个线程
        Thread t1 = new Thread(() -> ap.printNumbers(0));
        Thread t2 = new Thread(() -> ap.printNumbers(1));
        Thread t3 = new Thread(() -> ap.printNumbers(2));

        t1.start();
        t2.start();
        t3.start();

    }

    /**
     * 根据 turn 的值打印对应范围的数字
     *
     * @param offset 0:3n 1:3n+1 2:3n+2
     */
    private void printNumbers(int offset) {
        while (currentNumber <= 100) {
            synchronized (lock) {
                while ((turn % 3) != offset) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                if (currentNumber <= 100 && (currentNumber - 1) % 3 == offset) {
                    System.out.println("Thread " + (offset + 1) + " printed: " + currentNumber);
                    currentNumber++;
                    turn = (turn + 1) % 3;
                    lock.notifyAll();
                }
            }
        }
    }
}
  ```
## （三）线程交叉打印12A34B56C，多种实现方式（一个打印数字，一个打印字母）  
```java
/**
 * @Author: 奔跑的鑫
 * @Date: 2024/7/7 - 15:30
 * Description:使用wait()和notifyAll()
 */
public class CrossPrint {
    private static final Object lock = new Object();
    private static boolean printNumber  = true;

    public static void main(String[] args) {
        Thread printNumberThread = new Thread(() ->{
            for(int i = 1; i <= 52; i=i+2){
                synchronized (lock){
                    while(!printNumber){
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    System.out.print(i);
                    System.out.print(i + 1);
                    printNumber = false;// 打印切换标志
                    lock.notifyAll();// 唤醒等待的线程
                }
            }
        });

        Thread printLetterThread = new Thread(() ->{
            for(char c = 'A'; c <= 'Z'; c++){
                synchronized (lock){
                    while(printNumber){
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    System.out.print(c);
                    printNumber = true;// 打印切换标志
                    lock.notifyAll();// 唤醒等待的线程
                }
            }
        });

        printLetterThread.start();
        printNumberThread.start();
    }
}
```
## （四）仿购票系统，
  
   目前有1000张票，同时有10个购票窗口，模拟购票流程，打印购票结果，比如：从1窗口购买1张票，剩余999张票
   ```java
   

import java.util.Random;

/**
 * @Author: 奔跑的鑫
 * @Date: 2024/7/7 - 15:30
 * Description:
  TicketSystemDemo 类包含了一个模拟购票系统的主程序。TicketWindow 类实现了 Runnable接口，
  代表一个购票窗口。每个窗口在一个单独的线程中运行，尝试购买票，直到票卖完为止。
  关键点是使用 synchronized 块来同步对剩余票数的访问，以避免多个线程同时修改票数导致数据不一致。
  当剩余票数为0时，窗口线程将结束执行。
 */
public class TicketSystemDemo {
    /**
     * 总共票数
     */
    private static final int TOTAL_TICKETS = 1000;
    /**
     * 剩余票数
     */
    private static int remainingTICKETS = TOTAL_TICKETS;
    /**
     * 锁对象,用于同步
     */
    private static final Object lock = new Object();

    public static void main(String[] args) {
        // 创建线程，并且启动
        for (int i = 0; i < 10; i++) {
            new Thread(new TicketSeller(i)).start();
        }

    }

    private static class TicketSeller implements Runnable {
        private int windowNumber;

        public TicketSeller(int windowNumber) {
            this.windowNumber = windowNumber;
        }

        @Override
        public void run() {
            while (true) {
                synchronized (lock) {
                    if (remainingTICKETS > 0) {
                        try {
                            Thread.sleep(100);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        buyTicket();
                    } else {
                        break;
                    }
                    // 模拟购票后的其他操作，增加随机性
                    try {
                        Thread.sleep((long) (Math.random() * 1000));
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }


        private void buyTicket() {
            int number = new Random().nextInt(10);
            if(remainingTICKETS   >= number && number > 0){
                remainingTICKETS = remainingTICKETS - number;
                System.out.println("从窗口 G1000" + windowNumber + " 购买了 " + number + " 张票, 还剩 " + remainingTICKETS + " 张票");
            }
        }
    }
}
```
## （四）手写线程池
```java

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.atomic.AtomicInteger;

public class ThreadPoolTrader implements Executor {

    private final AtomicInteger ctl = new AtomicInteger(0);

    private volatile int corePoolSize;
    private volatile int maximumPoolSize;

    private final BlockingQueue<Runnable> workQueue;

    public ThreadPoolTrader(int corePoolSize, int maximumPoolSize, BlockingQueue<Runnable> workQueue) {
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
    }

    @Override
    public void execute(Runnable command) {
        int c = ctl.get();
        if (c < corePoolSize) {
            if (!addWorker(command)) {
                reject();
            }
            return;
        }
        if (!workQueue.offer(command)) {
            if (!addWorker(command)) {
                reject();
            }
        }
    }

    private boolean addWorker(Runnable firstTask) {
        if (ctl.get() >= maximumPoolSize) {
            return false;
        }

        Worker worker = new Worker(firstTask);
        worker.thread.start();
        ctl.incrementAndGet();
        return true;
    }

    private final class Worker implements Runnable {

        final Thread thread;
        Runnable firstTask;

        public Worker(Runnable firstTask) {
            this.thread = new Thread(this);
            this.firstTask = firstTask;
        }

        @Override
        public void run() {
            Runnable task = firstTask;
            try {
                while (task != null || (task = getTask()) != null) {
                    task.run();
                    if (ctl.get() > maximumPoolSize) {
                        break;
                    }
                    task = null;
                }
            } finally {
                ctl.decrementAndGet();
            }
        }

        private Runnable getTask() {
            for (; ; ) {
                try {
                    System.out.println("workQueue.size：" + workQueue.size());
                    return workQueue.take();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void reject() {
        throw new RuntimeException("Error！ctl.count：" + ctl.get() + " workQueue.size：" + workQueue.size());
    }

    public static void main(String[] args) {
        ThreadPoolTrader threadPoolTrader = new ThreadPoolTrader(2, 2, new ArrayBlockingQueue<Runnable>(10));

        for (int i = 0; i < 10; i++) {
            int finalI = i;
            threadPoolTrader.execute(() -> {
                try {
                    Thread.sleep(1500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("任务编号：" + finalI);
            });
        }
    }

}
```