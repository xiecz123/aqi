# aqi

air quality index serve

数据从 https://aqicn.org/json-api/doc/ 获取

Sequelize 提供了多种运算符.

```javascript
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }], // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }], // (a = 5) OR (b = 6)
    someAttribute: {
      // 基本
      [Op.eq]: 3, // = 3
      [Op.ne]: 20, // != 20
      [Op.is]: null, // IS NULL
      [Op.not]: true, // IS NOT TRUE
      [Op.or]: [5, 6], // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: "user.organization_id", // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6, // > 6
      [Op.gte]: 6, // >= 6
      [Op.lt]: 10, // < 10
      [Op.lte]: 10, // <= 10
      [Op.between]: [6, 10], // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal("SELECT 1"), // > ALL (SELECT 1)

      [Op.in]: [1, 2], // IN [1, 2]
      [Op.notIn]: [1, 2], // NOT IN [1, 2]

      [Op.like]: "%hat", // LIKE '%hat'
      [Op.notLike]: "%hat", // NOT LIKE '%hat'
      [Op.startsWith]: "hat", // LIKE 'hat%'
      [Op.endsWith]: "hat", // LIKE '%hat'
      [Op.substring]: "hat", // LIKE '%hat%'
      [Op.iLike]: "%hat", // ILIKE '%hat' (不区分大小写) (仅 PG)
      [Op.notILike]: "%hat", // NOT ILIKE '%hat'  (仅 PG)
      [Op.regexp]: "^[h|a|t]", // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.notRegexp]: "^[h|a|t]", // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.iRegexp]: "^[h|a|t]", // ~* '^[h|a|t]' (仅 PG)
      [Op.notIRegexp]: "^[h|a|t]", // !~* '^[h|a|t]' (仅 PG)

      [Op.any]: [2, 3], // ANY ARRAY[2, 3]::INTEGER (仅 PG)

      // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
      [Op.like]: { [Op.any]: ["cat", "hat"] }, // LIKE ANY ARRAY['cat', 'hat']

      // 还有更多的仅限 postgres 的范围运算符,请参见下文
    },
  },
});
```
