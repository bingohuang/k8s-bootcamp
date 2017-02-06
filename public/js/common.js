$(function() {

	$('.content__trigger, .header__sider').on('click', function(){
		if($('body').width() > 1000) {
 			$('body').toggleClass('page_desktop_hide');
 		} else {
 			$('body').toggleClass('page_open');
 		}
	});

	$(window).scroll(function() {
		var windscroll = $(window).scrollTop();
		if (windscroll > 0) {
			$('.scrolltop').addClass('scrolltop_active');
		} else {
			$('.scrolltop').removeClass('scrolltop_active');
		}
	}).scroll();

	$('.scrolltop').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});

});


// Ractive quiz
$(function() {

	var quizDataM1 = [{
		text	: '从核心说，Kubernetes 平台是用来做：',
		answers : [{
			text		: '配置机器 (类似于 Puppet 或 Ansible)',
			note		: 'Kubernetes 能够调度集群节点的工作负载，但是它不是一个机器配置工具。',
			isCorrect	: false
		},{
			text		: '在集群上运行和调度容器化应用',
			note		: 'Kubernetes允许你在分布式系统中编排和管理容器。',
			isCorrect	: true
		},{
			text		: '在容器中打包软件',
			note		: '在容器中打包软件的工具应该是Docker或者rkt。',
			isCorrect	: false
		}],
	},{
		text	: '在Kubernetes中，node是:',
		answers : [{
			text		: '在本地机器上启动Kubernetes集群的工具',
			note		: 'Minikube才可以用来启动Kubernetes集群',
			isCorrect	: false
		},{
			text		: '一台工作机',
			note		: 'Node正是用于部署应用的的地方',
			isCorrect	: true
		},{
			text		: '一台协调调度应用容器和管理集群的机器',
			note		: 'Master才是用于协调Kubernetes集群',
			isCorrect	: false
		}],
	},{
		text	: '你能在Kubernetes上部署什么？',
		answers : [{
			text		: '容器',
			note		: 'Kubernetes 支持 Docker、rkt和其它类型的容器',
			isCorrect	: true
		},{
			text		: '虚拟机',
			note		: 'Kubernetes自身不能部署虚拟机',
			isCorrect	: false
		},{
			text		: '系统进程(比如 sshd, httpd)',
			note		: 'Kubernetes自身不能部署系统进程',
			isCorrect	: false
		}],
	}]

	var quizDataM2 = [{
		text	: 'Kubectl 是:',
		answers : [{
			text		: '用于在本机启动 Kubernetes 集群的一个工具',
			note		: 'minikube才是干这事',
			isCorrect	: false
		},{
			text		: '一种 Kubernetes 的节点类型',
			note		: 'k8s的节点类型只有master和node',
			isCorrect	: false
		},{
			text		: '一个 Kubernetes cli 工具',
			note		: 'Bingo!',
			isCorrect	: true
		}],
	},{
		text	: 'Deployments是个什么东东？',
		answers : [{
			text		: '一种容器',
			note		: 'Deployments允许应用容器重新部署（比如失败了）',
			isCorrect	: false
		},{
			text		: 'Deployment会负责管理你程序的状态',
			note		: 'Deployment会负责创建和更新你应用的实例',
			isCorrect	: true
		},{
			text		: '一种 Kubernetes 的节点类型',
			note		: 'k8s的节点类型只有master和node， Deployments是部署在node中',
			isCorrect	: false
		}],
	},{
		text	: '用什么命令来创建一个Deployment?',
		answers : [{
			text		: '"kubectl get deployments"',
			note		: '此命令用来展示已经存在的Deployments',
			isCorrect	: false
		},{
			text		: '"kubectl get nodes"',
			note		: '此命令用来展示可用的节点',
			isCorrect	: false
		},{
			text		: '"kubectl run"',
			note		: '就是它了！',
			isCorrect	: true
		}],
	}]

		var quizDataM3 = [{
		text	: '什么是Pod',
		answers : [{
			text		: '上面部署着容器的主机',
			note		: '我们部署Pod的机器被称为Node',
			isCorrect	: false
		},{
			text		: 'Kubernetes的最小单位，负责部署和编排应用容器',
			note		: '一个Deployment，负责创建和更新应用容器的实例',
			isCorrect	: false
		},{
			text		: '一组应用容器，其中包含了共享的volume和IP地址',
			note		: 'Kubernetes的所有容器都被部署在Pod中',
			isCorrect	: true
		}],
	},{
		text	: 'Node是什么？',
		answers : [{
			text		: '一组部署在Kubernetes上的容器',
			note		: '一个Pod是一组部署在Node上的容器',
			isCorrect	: false
		},{
			text		: 'Node在Kubernetes中是一个工作机器',
			note		: '虚拟机或是物理机都可以作为Node',
			isCorrect	: true
		},{
			text		: 'Node是协调集群工作的机器',
			note		: 'Master是协调Kubernetes集群工作的机器',
			isCorrect	: false
		}],
	},{
		text	: '“kubectl exec -ti my_pod_name bash”这行命令的运行结果是什么？',
		answers : [{
			text		: '获取Pod的列表',
			note		: '获取运行"get pods"命令所需的Pod列表',
			isCorrect	: false
		},{
			text		: '在my_pod_name的第一个容器中打开一个控制台',
			note		: '如果在这个Pod上有多个容器，不要忘记指定容器的name',
			isCorrect	: true
		},{
			text		: '展示my_pod_name这个Pod运行在哪个Node上',
			note		: '"describe pod"命令可以显示Pod所在的Node',
			isCorrect	: false
		}],
	}]

	var quizDataM4 = [{
		text	: 'Service是什么？',
		answers : [{
			text		: '一组位置邻近、共同编排、共享volume和IP地址的容器',
			note		: '这是Pod的定义',
			isCorrect	: false
		},{
			text		: 'Service负责创建和更新容器化应用的实例',
			note		: 'Deployment管理着被部署容器的生命周期',
			isCorrect	: false
		},{
			text		: 'Kubernetes的Service是一个抽象层，定义了Pod的抽象集合',
			note		: '你可以使用Service对Pod进行分组',
			isCorrect	: true
		}],
	},{
		text	: '如何创建一个Service？',
		answers : [{
			text		: '使用"kubectl expose"命令',
			note		: '使用expose命令可以将Deployment暴露给外部访问',
			isCorrect	: true
		},{
			text		: '使用"kubectl describe"命令',
			note		: '这个命令用来查看资源配置的详情',
			isCorrect	: false
		},{
			text		: '使用"kubectl proxy"命令',
			note		: '这个命令也可以使Service可以对外访问，但只会在终端和集群之间创建一个路由',
			isCorrect	: false
		}],
	},{
		text	: '在Kubernetes中什么是Label？',
		answers : [{
			text		: '一种向外输出流量的方式',
			note		: 'Service才是让Pod可以对外访问的方式',
			isCorrect	: false
		},{
			text		: '一种Deployment的方式',
			note		: 'Deployment为部署的Pod自动生成label',
			isCorrect	: false
		},{
			text		: '通过key/value键值对组合相关的资源',
			note		: '可以使用label去组合相关的资源（比如web服务器，数据库）',
			isCorrect	: true
		}],
	}]

	var quizDataM5 = [{
		text	: '扩/缩容和Deployment之间是什么关系？',
		answers : [{
			text		: '扩/缩容可以更改Deployment中的副本数量',
			note		: '扩/缩容可以通过改变Deployment中的副本数量来实现',
			isCorrect	: true
		},{
			text		: '扩/缩容将Deployment暴露给外部的网络流量',
			note		: '是Service将Deployment暴露给外部的网络流量',
			isCorrect	: false
		},{
			text		: '扩/缩容创建一个新的Service',
			note		: '扩/缩容不会创建新的Service，Service会在扩/缩容的时候提供网络流量负载均衡的功能',
			isCorrect	: false
		}],
	},{
		text	: '"kubectl run"命令中，哪个参数设置可以扩展Deployment？',
		answers : [{
			text		: '--image',
			note		: 'image参数代表容器镜像的地址',
			isCorrect	: false
		},{
			text		: '--label',
			note		: 'label参数为Pod设置key/value值',
			isCorrect	: false
		},{
			text		: '--replicas',
			note		: 'replicas参数可以使能多副本的部署',
			isCorrect	: true
		}],
	},{
		text	: '一个Pod副本可能的状态都有哪些？',
		answers : [{
			text		: 'DESIRED，UP-TO-DATE和AVAILABLE',
			note		: '未包含目前运行的副本数',
			isCorrect	: false
		},{
			text		: 'DESIRED，CURRENT和UP-TO-DATE',
			note		: '未包含用户可访问的副本数',
			isCorrect	: false
		},{
			text		: 'DESIRED，CURRENT，UP-TO-DATE和AVAILABLE',
			note		: '这四种都是副本可能会呈现的状态',
			isCorrect	: true
		}],
	}]

	var quizDataM6 = [{
		text	: '滚动更新的范围是什么？',
		answers : [{
			text		: '更新一个Service',
			note		: 'Services会给新部署的Pod分发流量',
			isCorrect	: false
		},{
			text		: '更新一个Deployment',
			note		: '滚动更新可以通过增量更新Pod实例，实现Deployment的零宕机更新',
			isCorrect	: true
		},{
			text		: '扩展一个应用',
			note		: '滚动更新的目的是实现应用的增量更新',
			isCorrect	: false
		}],
	},{
		text	: '如果一个Deployment可以对外访问，在应用更新时网络流量会发生哪些变化？',
		answers : [{
			text		: '不能访问',
			note		: '滚动更新可以实现零宕机更新',
			isCorrect	: false
		},{
			text		: '网络流量会分发给旧的实例',
			note		: 'Service监控着Deployment中所有的Pod',
			isCorrect	: false
		},{
			text		: '流量会分发给可用的实例（包括新的和旧的）',
			note		: '如果Deployment可以对外访问，在更新期间Service会将流量分发给可用的Pod',
			isCorrect	: true
		}],
	},{
		text	: 'kubectl的哪个命令可以更新Deployment',
		answers : [{
			text		: '"kubectl set image"',
			note		: '更新容器镜像时可以使用"set image"',
			isCorrect	: true
		},{
			text		: '"kubectl rollout undo"',
			note		: '回滚一条Deployment更新时使用这行命令',
			isCorrect	: false
		},{
			text		: '"kubectl rollout status"',
			note		: '使用这行命令可以查看Deployment目前的状态',
			isCorrect	: false
		}],
	}]

	var template = '<div class="quiz">\
						<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">\
							<div class="carousel-inner" role="listbox">\
								{{#each questions:i}}\
								<div class="item {{ i === 0 ? "active" : "" }}">\
									<div class="row">\
										<div class="col-md-12">\
											<h2>问题 {{ i + 1 }}</h2>\
											<p>{{ text }}</p>\
											<p style="color: #3771e3;"><i>请选择一个答案</i></p>\
										</div>\
									</div>\
									<div class="quiz__list {{ answered ? "quiz__list_open" : "" }}">\
										{{#each answers:j}}\
										<div class="quiz__var {{ isCorrect	? "quiz__var_true" : "quiz__var_false" }} {{ answered ? "quiz__var_open" : "" }}">\
											<div class="quiz__box">{{ text }}</div>\
											<div class="quiz__note">{{ note }}</div>\
										</div>\
										{{/each}}\
									</div>\
								</div>\
								{{/each}}\
							</div>\
							<ol class="carousel-indicators">\
								<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>\
								<li data-target="#carousel-example-generic" data-slide-to="1"></li>\
								<li data-target="#carousel-example-generic" data-slide-to="2"></li>\
							</ol>\
							<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">\
								<span class="sr-only">Previous</span>\
							</a>\
							<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">\
								<span class="sr-only">Next</span>\
							</a>\
						</div>\
					</div>';

	var ractive1 = new Ractive({
		el: '#quizTest1',
		template: template,
		data: {
			questions: quizDataM1
		}
	});
	var ractive2 = new Ractive({
		el: '#quizTest2',
		template: template,
		data: {
			questions: quizDataM2
		}
	});
	var ractive3 = new Ractive({
		el: '#quizTest3',
		template: template,
		data: {
			questions: quizDataM3
		}
	});
	var ractive4 = new Ractive({
		el: '#quizTest4',
		template: template,
		data: {
			questions: quizDataM4
		}
	});
	var ractive5 = new Ractive({
		el: '#quizTest5',
		template: template,
		data: {
			questions: quizDataM5
		}
	});
	var ractive6 = new Ractive({
		el: '#quizTest6',
		template: template,
		data: {
			questions: quizDataM6
		}
	});



	$('.quiz__var').on('click', function(){
		var thisVar = $(this);
		var thisVarParent = thisVar.closest('.quiz__list');
		if (!thisVar.parents().hasClass('quiz__list_ready')) {
			thisVar.addClass('quiz__var_open').addClass('quiz__var_active').siblings().removeClass('quiz__var_active');
			if (!thisVar.hasClass('quiz__var_false')) {
				thisVarParent.addClass('quiz__list_ready');
			}
		}
	});

	$('.carousel').carousel({
		interval: false
	})

});
