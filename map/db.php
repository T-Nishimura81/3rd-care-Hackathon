<script>
<?php
  $db = mysqli_connect(
    '/* サーバ名 */',
    '/* ユーザ名 */',
    '/* パスワード */',
    '/* DB名 */'
  );
  $table = '/* table名 */';
  $field = [
    '/* 避難所座標(フィールド名) */',
    '/* 危険地点座標(フィールド名) */'
  ];
  $sql = '';
  $r = mysqli_query($db, $sql);
?>
</script>