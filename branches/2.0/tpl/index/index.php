<?php 
    /**
     * @file  index.php
     * @author NHN (developers@xpressengine.com)
     * @brief Start page
     *
     * Find and create module object by mif, act in Request Argument \n
     * Set module information
     *
     * @mainpage XpressEngine 
     * @section intro introduction
     * XE is an opensource and being developed in the opensource project. \N
     * For more information, please see the link below.
     * - Official website: http://www.xpressengine.com
     * - SVN Repository      : http://svn.xpressengine.net/xe
     * \n
     * "XpressEngine (XE)" is free software; you can redistribute it and/or \n
     * modify it under the terms of the GNU Lesser General Public \n
     * License as published by the Free Software Foundation; either \n
     * version 2.1 of the License, or (at your option) any later version. \n
     * \n
     * This library is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
     * Lesser General Public License for more details.
     * \n
     * You should have received a copy of the GNU Lesser General Public
     * License along with this library; if not, write to the Free Software
     * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
     *
     **/

    /**
     * @brief Declare constants for generic use and for checking to avoid a direct call from the Web
     **/
    define('__ZBXE__', true); // deprecated : The constant ZBXE will be removed. Use XE instead.
	define('__XE__',   true);

    /**
     * @brief Refresh, 트래픽 유발 공격 대응 [@@Anti-accessXE@@]
     **/
    define('_ANTI_ACCESS_', str_replace('index.php', '', str_replace('\\', '/', __FILE__)).'modules/antiaccess/antiaccess.index.php');
    if(is_file(_ANTI_ACCESS_)) require_once(_ANTI_ACCESS_);

    /**
     * @brief Include the necessary configuration files
     **/
    require('./config/config.inc.php');

    /**
     * @brief Initialize by creating Context object
     * Set all Request Argument/Environment variables
     **/
    $oContext = &Context::getInstance();
    $oContext->init();

    /**
     * @brief If default_url is set and it is different from the current url, attempt to redirect for SSO authentication and then process the module
     **/
    if($oContext->checkSSO()) {
        $oModuleHandler = new ModuleHandler();
        if($oModuleHandler->init()) {
            $oModule = &$oModuleHandler->procModule();
            $oModuleHandler->displayContent($oModule);
        }
    }
    $oContext->close();
?>
