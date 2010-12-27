/**
 * @file   modules/antiaccess/js/antiaccess.js
 * @author largeden (cbrghost@gmail.com)
 * @brief  antiaccessXE configuration javascript
 **/

var $ = jQuery.noConflict();
var $antiaccess = {
    // 기본 차단 설정
    use : function(element) {
        var params = new Array();
        if(element.checked) params[element.name] = element.value;
        else params[element.name] = 'N';
        
        exec_xml('antiaccess','procAntiaccessAdminInsertUse', params);
    },
    // 금지 IP 적용 설정
    updateBanipApply : function(element) {
        var value = element.value.split("|@|");
        var params = new Array();
        params['apply'] = value[0];
        params['ban_srl'] = value[1];

        exec_xml('antiaccess','procAntiaccessAdminUpdateBanipApply', params);
    },
    // 비금지 IP 적용 설정
    updateWhiteipApply : function(element) {
        var value = element.value.split("|@|");
        var params = new Array();
        params['apply'] = value[0];
        params['white_srl'] = value[1];

        exec_xml('antiaccess','procAntiaccessAdminUpdateWhiteipApply', params);
    },
    // 접근한 IP 금지 여부 설정
    updateAccessipApply : function(element) {
        var params = new Array();
        if(element.checked) params[element.name] = 'Y';
        else params[element.name] = 'N';

        params['ipaddress'] = element.value;

        exec_xml('antiaccess','procAntiaccessAdminUpdateAccessipApply', params, complete_reload);
    },
    // 접근한 IP 자동차단 해제 설정
    updateAccessipUnblock : function(element) {
        var params = new Array();
        params['ipaddress'] = element.title;

        exec_xml('antiaccess','procAntiaccessAdminUpdateAccessipUnblock', params, complete_reload);
    },
    // 동기화 진행
    synchronization : function(element) {
        var params = new Array();
        params['follow_srl'] = element.title;

        exec_xml('antiaccess','procAntiaccessAdminSynchronization', params, complete);
    },
    // 금지 HOST 등록 여부 설정
    updateBanhostType : function(element) {
        var params = new Array();
        if(element.checked) params[element.name] = 'Y';
        else params[element.name] = 'N';

        params['host_srl'] = element.value;

        exec_xml('antiaccess','procAntiaccessAdminUpdateBanhostType', params);
    },
    // 최신 버전 상태 알림
    new_version : function() {
        var params = new Array();
        params['check'] = 'Y';

        alert(msg_antiaccess_new_version);

        var url = "http://www.xpressengine.com/?mid=download&package_srl=19323693";
        window.open(url,'_blank');
    },
    // 스크립트 로드
    antiaccess_ready : function() {
        $('html').ready(function(){
            // 최신 버전 상태 알림
            if(typeof(msg_antiaccess_new_version) != 'undefined') $antiaccess.new_version();

            // 기본 차단 설정
            $('#use_config input:checkbox').click(function() {
                $antiaccess.use(this);
            });

            // 금지 IP 적용 설정
            $('#banip_list input[name^=apply_]').click(function() {
                $antiaccess.updateBanipApply(this);
            });

            // 비금지 IP 적용 설정
            $('#whiteip_list input[name^=apply_]').click(function() {
                $antiaccess.updateWhiteipApply(this);
            });

            // 접근한 IP 금지 여부 설정
            $('#accessip_list input[name^=ban]').click(function() {
                $antiaccess.updateAccessipApply(this);
            });
            $('#accessip_list input[name^=white]').click(function() {
                $antiaccess.updateAccessipApply(this);
            });

            // 접근한 IP 자동차단 해제 설정
            $('#accessip_list a[id^=block_]').click(function() {
                $antiaccess.updateAccessipUnblock(this);
            });

            // 동기화 진행
            $('#follow_host a[id^=sync_]').click(function() {
                $antiaccess.synchronization(this);
            });

            // 금지 HOST 등록 여부 설정
            $('#banhost_list input[name^=ban_type]').click(function() {
                $antiaccess.updateBanhostType(this);
            });
            $('#banhost_list input[name^=white_type]').click(function() {
                $antiaccess.updateBanhostType(this);
            });
        });
    }
};

//$.fn.extend(antiaccess);
$antiaccess.antiaccess_ready();