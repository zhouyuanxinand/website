# 题目1 两数之和：
`地址：https://leetcode.cn/problems/two-sum/`
# 问题描述
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**代码：**
```c
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i]; // 计算目标差值
            if (map.containsKey(complement)) {
                // 如果找到了差值，说明找到了两个数
                return new int[] { map.get(complement), i };
            } else {
                // 否则，将当前元素及其索引存入map
                map.put(nums[i], i);
            }
        }
        return null; // 如果没有找到结果，返回空数组，或者可以抛出异常
    }
}
```

---
# 代码分析：

通过使用map来作为数据容器，对源数据进行比对，其实是遍历的思想，同时又通过一次次比对，从而缩小数据范围。==map.containsKey()==很巧妙地的解决了数据比对这个流程，确认 Map 中是否存在`int complement = target - nums[i]`

---

# 补充
 `与 containsKey() 的区别：containsKey() 用于检查键的存在性，而 containsValue() 用于检查值的存在性。`
 

```java
Map<String, Integer> map = new HashMap<>();
map.put("key1", 100);
map.put("key2", 200);
----------------------------
//containsKey()
boolean hasKey = map.containsKey("key1"); // 返回 true
boolean hasAnotherKey = map.containsKey("key2"); // 返回 false
----------------------------
//containsValue() 
boolean hasValue = map.containsValue(100); // 返回 true
boolean hasAnotherValue = map.containsValue(300); // 返回 false
```


