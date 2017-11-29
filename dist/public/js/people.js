function people(uid){
var doc = document;
	doc.getElementById('headImg').onclick = function(){
		doc.getElementById('peopleHeadForm').style.display = 'block';
	}
	doc.getElementById('back').onclick = function(){
		formPost('/main',{uid:uid});
	}

$('#headUpdate').click(function(){
     var avator = $('#avator').val();
     if(avator.length){
     var input = doc.createElement('input');
          input.style.display = 'none';
          input.name = 'uid';
          input.value = uid;

     var peopleHeadForm = $('#peopleHeadForm');
          peopleHeadForm.append(input);
          peopleHeadForm.submit();
     }else{
          $('#avator').css('border','solid 1px #449933');
          return false;
     }
});

$('#textUpdate').click(function(){
     console.log('click the update button');
     var 
          name = $('#name').val().trim(),
          introduce = $('#introduce').val().trim(),
          sex = $('#sex').val().trim(),
          hobby = $('#hobby').val().trim(),
          birthday = $('#birthday').val().trim();

     if(name.length>10){
          $('#name').css('border','solid 1px red');
          $('button#textUpdate').text('昵称字数过长');
          setTimeout(function(){
               $('button#textUpdate').text('更新');
          },2000)
          return false;
     }else if(introduce.length>60){
          $('textarea#introduce').css('border','solid 1px red');
          $('button#textUpdate').text('简介字数不能超过6０');
          setTimeout(function(){ $('button#textUpdate').text('更新'); },2000);
          return false;
     }else{
          var data = {
               uid:uid,
               name:name,
               introduce:introduce,
               sex:sex,
               hobby:hobby,
               birthday:birthday
          }
          text_filter(data);
          postChangeText('/peopleT',data,function(data_back){
               $('#name').val(data_back.name);
               $('#introduce').val(data_back.introduce);
               $('#sex').val(data_back.sex);
               $('#hobby').val(data_back.hobby);
               $('#birthday').val(data_back.birthday);
               $('button#textUpdate').text('更新成功');
               setTimeout(function(){ $('button#textUpdate').text('更新'); },2000);
          });
     }
})

}
